const explode = (dom: any, level = 0) => {
  if (!dom) {
    return;
  }
  // const sty = getComputedStyle(dom);
  Object.assign(dom.style, {
    transformStyle: 'preserve-3d',
    transform: `translateZ(${1 * level}px)`,
    // position: sty.position !== 'absolute' ? 'relative' : sty.position,
    overflow: 'initial',
  });

  if (dom.children) {
    [...dom.children].forEach((child: any) => {
      explode(child, level + 1);
    })
  }
}

export default () => {
  Object.assign(document.body.style, {
    perspective: '1000px',
  });

  const scene: any = document.body;
  const rect: any = scene.getBoundingClientRect();
  const container: any = document.getElementById('root');

  document.body.addEventListener('mousemove', (event: any) => {
    const x = event.pageX;
    const y = event.pageY;
    const rx = (x - rect.x) / rect.width * 120 - 60;
    const ry = (y - rect.y) / rect.height * 90 - 45;
    container.style.transform = `rotateX(${ry}deg) rotateY(${-rx}deg)`;
  })
  explode(container);
}