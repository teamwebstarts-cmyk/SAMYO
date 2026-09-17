import { getIcon } from '../utils/icons.js';

export const Toast = {
  show(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = getIcon('check', { size: 18, strokeWidth: 2.5 });
    } else if (type === 'warning') {
      iconSvg = getIcon('alertTriangle', { size: 18, strokeWidth: 2.5 });
    } else if (type === 'danger') {
      iconSvg = getIcon('alertCircle', { size: 18, strokeWidth: 2.5 });
    } else {
      iconSvg = getIcon('info', { size: 18, strokeWidth: 2.5 });
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }
};
