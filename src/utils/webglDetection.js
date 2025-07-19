/**
 * Utility function to detect if WebGL is available
 * @returns {boolean} True if WebGL is supported and available
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(context && context.getExtension);
  } catch (e) {
    return false;
  }
}

/**
 * Get WebGL error information for debugging
 * @returns {string} Error message describing WebGL status
 */
export function getWebGLErrorInfo() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return 'WebGL is not supported by your browser or graphics drivers.';
    }
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      return `WebGL available. Renderer: ${renderer}, Vendor: ${vendor}`;
    }
    
    return 'WebGL is available but debug info is not accessible.';
  } catch (error) {
    return `WebGL detection failed: ${error.message}`;
  }
} 