import useWindowResize from '.'

export default function UseWindowResizeTest() {
  const { width, height } = useWindowResize()

  return (
    <div style={{ padding: '32px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Use Window Resize Hook</h1>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  )
}