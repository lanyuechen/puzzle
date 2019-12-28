const explode = (dom, rect = dom && dom.getBoundingClientRect(), level = 0) => {
  if (!dom) {
    return;
  }

  const sty = getComputedStyle(dom);

  const { left, top } = rect;
  let { width, height } = rect;
  if (sty.boxSizing === 'content-box') {
    width += parseFloat(sty.paddingLeft || 0) + parseFloat(sty.paddingRight || 0);
    height += parseFloat(sty.paddingTop || 0) + parseFloat(sty.paddingBottom || 0);
  }

  if (dom.children) {
    [...dom.children].reverse().map(d => {
      return {
        dom: d,
        rect: d.getBoundingClientRect(),
      }
    }).forEach(d => {
      explode(d.dom, d.rect, level + 1);
    });
  }

  Object.assign(dom.style, {
    transition: level > 0 ? 'transform .5s' : undefined,
    transformStyle: 'preserve-3d',
    transform: `translateZ(${1 * level}px)`,
    overflow: 'initial',
    // position: 'fixed',
    // left: `${left}px`,
    // top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  });

  if (level > 0) {
    // const shadow = document.createElement('div');
    // shadow.style.cssText = `
    //   transformStyle: preserve-3d;
    //   transform: translateZ(${1 * (level - 1)}px);
    //   position: fixed;
    //   left: ${left}px;
    //   top: ${top}px;
    //   width: ${width}px;
    //   height: ${height}px;
    //   background: rgba(0, 0, 0, 0.8);
    //   filter: blur(5px);
    // `;
    // dom.parentNode.appendChild(shadow);
  }
}

export default () => {
  document.body.style.perspective = '1000px';
  document.body.style.background = '#000';
  // document.body.style.perspectiveOrigin = 'center';

  const scene = document.body;
  const rect = scene.getBoundingClientRect();
  const container = document.getElementById('root');
  const a = document.querySelector('#root > div');


  document.body.addEventListener('mousemove', event => {
    const x = event.pageX;
    const y = event.pageY;
    const rx = (x - rect.x) / rect.width * 120 - 60;
    const ry = (y - rect.y) / rect.height * 90 - 45;
    container.style.transform = `rotateX(${ry}deg) rotateY(${-rx}deg)`;
  })
  // explode(container);
}
