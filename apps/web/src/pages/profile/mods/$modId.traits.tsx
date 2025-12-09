import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/mods/$modId/traits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/mods/$modId/traits"!</div>
}
