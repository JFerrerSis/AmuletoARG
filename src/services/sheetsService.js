const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const CACHE_KEY = "amuleto_productos_cache";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop";

/**
 * Convierte cualquier formato de URL de Google Drive en un enlace de imagen utilizable por el navegador.
 */
const transformarUrlDrive = (url) => {
  if (!url || typeof url !== 'string') return '';
  let urlLimpia = url.trim();

  // Si es un enlace de Google Drive
  if (urlLimpia.includes('drive.google.com') || urlLimpia.includes('googleusercontent.com')) {
    // Extrae el ID único del archivo en Drive
    const match = urlLimpia.match(/\/d\/([a-zA-Z0-9_-]+)/) || urlLimpia.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  return urlLimpia;
};

export const fetchProductos = async (forceRefresh = true) => {
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (!forceRefresh && cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error("Error leyendo caché local:", e);
    }
  }

  if (!APPS_SCRIPT_URL) {
    console.error("Error: VITE_APPS_SCRIPT_URL no está definida en el archivo .env");
    return cachedData ? JSON.parse(cachedData) : [];
  }

  try {
    const fetchUrl = `${APPS_SCRIPT_URL}${APPS_SCRIPT_URL.includes('?') ? '&' : '?'}t=${Date.now()}`;
    const res = await fetch(fetchUrl, { cache: 'no-store' });

    if (!res.ok) throw new Error(`Error en respuesta HTTP: ${res.status}`);

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      throw new Error("Respuesta de la API devuelta como HTML. Revisa el despliegue en Google Apps Script.");
    }

    const rawData = await res.json();

    const dataNormalizada = rawData.map(item => {
      const normalizedObj = {};
      Object.keys(item).forEach(key => {
        normalizedObj[key.trim().toLowerCase()] = item[key];
      });
      return normalizedObj;
    });

    const productosProcesados = dataNormalizada
      .filter((p) => {
        const valorActivo = p.activo ?? p.disponible;
        if (typeof valorActivo === 'boolean') {
          return valorActivo === true;
        }
        const estado = String(valorActivo ?? '').trim().toLowerCase();
        return estado === 'true' || estado === '1' || estado === 'si';
      })
      .map((p) => {
        // Lee la celda de la imagen
        const rawImagesStr = String(p.imagen || p.imagen_url || p.imagenes || '').trim();

        // Separa por comas o saltos de línea y aplica la transformación a cada URL
        const listaImagenes = rawImagesStr
          ? rawImagesStr
              .split(/[\n,]+/)
              .map((url) => transformarUrlDrive(url))
              .filter((url) => url.length > 0)
          : [];

        const finalImagenes = listaImagenes.length > 0 ? listaImagenes : [PLACEHOLDER_IMAGE];
        const textoDescripcion = p.descripcion || p.descipcion || '';

        return {
          id: String(p.id || Math.random()),
          nombre: String(p.nombre || 'Accesorio'),
          descripcion: String(textoDescripcion),
          precio: parseFloat(p.precio) || 0,
          categoria: String(p.categoria || 'GENERAL').toUpperCase(),
          subcategoria: String(p.subcategoria || '').toUpperCase(),
          imagenes: finalImagenes,
          imagen_url: finalImagenes[0],
        };
      });

    localStorage.setItem(CACHE_KEY, JSON.stringify(productosProcesados));

    return productosProcesados;
  } catch (error) {
    console.error("Error al obtener productos desde Apps Script:", error);
    return cachedData ? JSON.parse(cachedData) : [];
  }
};