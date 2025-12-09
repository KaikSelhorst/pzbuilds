import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/mods/$modId/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/mods/$modId/skills"!</div>
}
