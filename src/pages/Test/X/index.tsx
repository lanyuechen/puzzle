import React, { useEffect, useRef } from 'react';

const source = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/300px-Meisje_met_de_parel.jpg';

let last = 0;
let speed = 100;

export default (props: any) => {
  const { width, height } = props;

  let picData: any;
  const points: any = [];
  let definition = 100;
  let partSize = height / definition;
  let minSpeed = .15;
  let maxDT = 1 / 30;
  let previous: number;

  const ref: any = useRef(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const ctx = ref.current.getContext('2d');
    prepare(ctx, source);
  }, []);

  const prepare = async (ctx: any, source: any) => {
    const img = await load(source);
    picData = getLightData(img);
    requestAnimationFrame((t: number) => loop(ctx, t));
  }

  const load = (src: any) => {
    if (src instanceof File) {
      return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.onload = () => res(load(reader.result));
        reader.onerror = rej;
        reader.readAsDataURL(src);
      });
    }
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  }

  const getLightData = (img: any) => {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = width;

    const ctx: any = c.getContext('2d');
    ctx.fillRect(0, 0, width, height);
    let w = width;
    let h = height;
    let imgRatio = img.width / img.height;
    if (imgRatio > w / h) {
      h = w / imgRatio;
    } else {
      w = h * imgRatio;
    }
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
    let data = ctx.getImageData(0, 0, width, height).data;
    let ret = [];
    for (let i = 0, n = data.length; i < n; i += 4) {
      ret.push((.2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2]) / 255);
    }
    return ret;
  }

  const loop = (ctx: any, timestamp: number) => {
    if (!previous) {
      previous = timestamp;
    }
    let dt = (timestamp - previous) * .001;
    if (dt > maxDT) {
      dt = maxDT;
    }
    previous = timestamp;
    tick(dt);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#39ef61';
    for (let i = points.length; i--;) {
      let point = points[i];
      let val = 1 - at(point.x, point.y);
      let factor = minSpeed + (1 - minSpeed) * (val * val);
      point.x += speed * dt * factor;
      if (point.x >= width || point.x < 0 || point.y >= height || point.y < 0) {
        points.splice(i, 1);
        continue;
      }
      ctx.fillRect(point.x, point.y, 1, partSize);
    }
    requestAnimationFrame((t: any) => loop(ctx, t));
  }

  const at = (x: number, y: number) => {
    return picData[~~x + ~~y * width] || 0;
  }

  const addLine = () => {
    points.push(...[...Array(definition)].map((e, i) => ({ x: 0, y: i * partSize })));
  }

  const tick = (dt: number) => {
    last += dt || 0;
    if (last >= 0.1) {
      addLine();
      last = last % 0.1;
    }
  }

  const upload = (e: any) => {
    const files = e.target.files;
    const file = files && files[0];
    if (!file) {
      return;
    }
    prepare(ref.current.getContext('2d'), file);
  }

  return (
    <div>
      <input type="file" onChange={upload} />
      <canvas width={width} height={height} ref={ref} />
    </div>
  )
}
