import { Button } from '@org/design-system/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { CreateModModal } from '@/components/modal/create-mod-modal'

export const Route = createFileRoute('/profile/mods')({
  component: RouteComponent,
})

const tags = ['Confort', 'Safety', 'Transmission']
const images = [
  'https://images.steamusercontent.com/ugc/13786117600799927718/6FA3922C60C29B9A9E1248BEF490E0C31A5AB7CC/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
  'https://images.steamusercontent.com/ugc/9440893545708730406/7D86585BF03CECF0F3A576FF6F1807E60F7D15E6/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
  'https://images.steamusercontent.com/ugc/11012608465185852961/16054438CE61A7F5DE985D75E338E8B51F398E46/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
]
const titles = [
  'Psychopath Trait [B41+B42]',
  '[B42] Tourette Syndrome',
  'Kill Milestones (Zombies) B42',
]

const modsCreated = new Array(10).fill(null).map((_, i) => ({
  id: Math.random() * 200,
  title: titles[i % titles.length],
  tags: [tags[i % tags.length]],
  image: images[i % images.length],
}))

function RouteComponent() {
  return (
    <>
      <nav className="mb-2 flex justify-between">
        <Button variant="outline">Filter</Button>
        <CreateModModal />
      </nav>
      <ul className="grid grid-cols-2 gap-3">
        {modsCreated.map((mod) => (
          <li key={mod.id} className="border rounded p-2 flex gap-3">
            <img
              src={mod.image}
              alt={mod.title}
              className="w-[77px] overflow-hidden rounded"
            />
            <div className="flex flex-col flex-1">
              <header className="flex justify-between">
                <h2 className="font-medium">{mod.title}</h2>
              </header>
              <div>
                {new Array(5)
                  .fill('☆')
                  .splice(0, Math.random() * 5)
                  .join('')
                  .padStart(5, '★')}
              </div>
              <div className="space-x-1 text-sm text-muted-foreground mt-auto">
                {mod.tags.map((tag) => (
                  <span>{tag}</span>
                ))}
              </div>
            </div>
            <ul className="space-y-1 text-sm min-w-fit">
              <li>Occupations: 0</li>
              <li>Skills: 2</li>
              <li>Traits: 12</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}
