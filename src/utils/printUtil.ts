type PrintOptions = {
  title?: string;
  styles?: string; 
};

function collectStyles(): string {
  let styles = '';

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        styles += rule.cssText;
      }
    } catch {
      
    }
  }

  return `<style>${styles}</style>`;
}

export function printElement(
  ref: React.RefObject<HTMLElement>,
  options: PrintOptions = {}
) {
  const el = ref.current;
  if (!el) return;

  const iframe = document.createElement('iframe');

  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  document.body.appendChild(iframe);

  const doc = iframe.contentDocument!;
  const win = iframe.contentWindow!;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${options.title ?? ''}</title>
        ${collectStyles()}
        <style>
          ${options.styles ?? ''}
        </style>
      </head>
      <body>
        ${el.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  // 等待样式和字体加载完成
  iframe.onload = () => {
    win.focus();
    win.print();

    // 打印结束后清理
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
}
