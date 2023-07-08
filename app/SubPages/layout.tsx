export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>SUB LAYOUT</div>
      <div>{children}</div>
    </>
  )
}
