/**
 * Utilidades para manejo de imágenes
 */

/**
 * Comprime una imagen manteniendo la proporción
 * @param {File} file - Archivo de imagen
 * @param {number} maxWidth - Ancho máximo en píxeles
 * @param {number} quality - Calidad de compresión (0-1)
 * @returns {Promise<string>} - Imagen en formato base64
 */
export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensionar si excede el ancho máximo
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a base64
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      
      img.onerror = reject;
    };
    
    reader.onerror = reject;
  });
};

/**
 * Valida que el archivo sea una imagen
 * @param {File} file - Archivo a validar
 * @returns {boolean}
 */
export const validateImageType = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
};

/**
 * Valida el tamaño del archivo
 * @param {File} file - Archivo a validar
 * @param {number} maxSizeMB - Tamaño máximo en MB
 * @returns {boolean}
 */
export const validateImageSize = (file, maxSizeMB = 5) => {
  const maxSize = maxSizeMB * 1024 * 1024;
  return file.size <= maxSize;
};

/**
 * Crea un thumbnail cuadrado
 * @param {string} imageUrl - URL de la imagen
 * @param {number} size - Tamaño del thumbnail
 * @returns {Promise<string>}
 */
export const createThumbnail = (imageUrl, size = 150) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext('2d');
      
      // Calcular crop cuadrado centrado
      const minDim = Math.min(img.width, img.height);
      const x = (img.width - minDim) / 2;
      const y = (img.height - minDim) / 2;
      
      ctx.drawImage(img, x, y, minDim, minDim, 0, 0, size, size);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
  });
};

/**
 * Imagen por defecto cuando no hay imagen
 */
export const DEFAULT_PRODUCT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaW4gaW1hZ2VuPC90ZXh0Pjwvc3ZnPg==';