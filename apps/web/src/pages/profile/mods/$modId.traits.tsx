import { Badge } from '@org/design-system/components/ui/badge'
import { Button } from '@org/design-system/components/ui/button'
import { ButtonGroup } from '@org/design-system/components/ui/button-group'
import { Plus } from '@org/design-system/components/ui/icons'
import { ScrollArea } from '@org/design-system/components/ui/scroll-area'
import { z } from '@org/validation'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

const traitSearchSchema = z.object({
  traitType: z
    .enum(['NEGATIVE', 'POSITIVE'])
    .catch('POSITIVE')
    .default('POSITIVE'),
})

export const Route = createFileRoute('/profile/mods/$modId/traits')({
  component: RouteComponent,
  validateSearch: traitSearchSchema,
})

function RouteComponent() {
  return (
    <>
      <nav className="flex justify-between items-center pl-2 pr-3 my-2">
        <TraitTypeFilter />
        <Button>
          New Trait <Plus />
        </Button>
      </nav>
      <TraitList />
    </>
  )
}

function TraitList() {
  const { traitType } = Route.useSearch()

  const activeTraits = useMemo(() => {
    if (!traitType) return []
    return traits.filter((trait) => trait.type === traitType.toLowerCase())
  }, [traitType])

  return (
    <ScrollArea className="h-[calc(75vh)] pr-3 pl-2">
      <ul className="space-y-2">
        {activeTraits.map((trait) => (
          <li
            key={trait.id}
            className="border p-2 bg-card rounded-md text-card-foreground flex justify-between"
          >
            <div>
              <h2 className="font-medium">{trait.name}</h2>
              <p className="text-sm text-muted-foreground">
                {trait.description}
              </p>
            </div>
            <Badge
              variant={trait.type === 'positive' ? 'destructive' : 'success'}
            >
              {trait.type === 'positive' ? trait.cost : `+${trait.cost}`}
            </Badge>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

function TraitTypeFilter() {
  const { traitType } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <ButtonGroup>
      <Button
        variant={traitType === 'POSITIVE' ? 'default' : 'secondary'}
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, traitType: 'POSITIVE' }) })
        }
      >
        Positive
      </Button>
      <Button
        variant={traitType === 'NEGATIVE' ? 'default' : 'secondary'}
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, traitType: 'NEGATIVE' }) })
        }
      >
        Negative
      </Button>
    </ButtonGroup>
  )
}

export const traits = [
  // Positive Traits
  {
    id: 'uuid-1',
    name: 'Adrenaline Junkie',
    description: 'Recovers from panic and stress faster. ',
    cost: -8,
    type: 'positive',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-2',
    name: 'All Thumbs',
    description:
      'Slower at equipping/unequipping weapons and moving items to containers.',
    cost: 4,
    type: 'negative',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-3',
    name: 'Asthmatic',
    description: 'Faster endurance loss when running/swinging weapons.',
    cost: 5,
    type: 'negative',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-4',
    name: 'Athletic',
    description: '+4 Fitness, runs faster.',
    cost: -10,
    type: 'positive',
    incompatibleWith: ['uuid-27', 'uuid-28', 'uuid-29'], // Obese, Overweight, Unfit
    modId: 'base',
  },
  {
    id: 'uuid-5',
    name: 'Brave',
    description: 'Less prone to becoming panicked.',
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-19'], // Cowardly
    modId: 'base',
  },
  {
    id: 'uuid-6',
    name: 'Burglar',
    description: 'Starts with Hotwiring skill level 2 and Night Vision.',
    cost: -12,
    type: 'positive',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-7',
    name: 'Clumsy',
    description: 'More likely to make noise when moving and fail at actions.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-24'], // Graceful
    modId: 'base',
  },
  {
    id: 'uuid-8',
    name: 'Conspicuous',
    description: 'More likely to be spotted by zombies.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-30'], // Inconspicuous
    modId: 'base',
  },
  {
    id: 'uuid-9',
    name: 'Cowardly',
    description: 'More prone to becoming panicked.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-5'], // Brave
    modId: 'base',
  },
  {
    id: 'uuid-10',
    name: 'Deaf',
    description: 'Reduced hearing range.',
    cost: 12,
    type: 'negative',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-11',
    name: 'Desensitized',
    description: 'Immune to zombie-related stress and panic.',
    cost: -12,
    type: 'positive',
    incompatibleWith: ['uuid-26'], // Hemophobic
    modId: 'base',
  },
  {
    id: 'uuid-12',
    name: 'Dextrous',
    description: 'Faster item transfer between inventory and containers.',
    cost: -2,
    type: 'positive',
    incompatibleWith: ['uuid-1'], // All Thumbs
    modId: 'base',
  },
  {
    id: 'uuid-13',
    name: 'Fast Healer',
    description: 'Recovers from injuries and illness faster.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-43'], // Slow Healer
    modId: 'base',
  },
  {
    id: 'uuid-14',
    name: 'Fast Learner',
    description: '+30% XP gain in all skills.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-44'], // Slow Learner
    modId: 'base',
  },
  {
    id: 'uuid-15',
    name: 'Fast Reader',
    description: 'Reads skill books faster.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-45'], // Slow Reader
    modId: 'base',
  },
  {
    id: 'uuid-16',
    name: 'Feeble',
    description: '-2 Strength, lower knockback.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-46', 'uuid-47'], // Strong, Stout
    modId: 'base',
  },
  {
    id: 'uuid-17',
    name: 'Fit',
    description: '+2 Fitness.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-27', 'uuid-28', 'uuid-29'], // Obese, Overweight, Unfit
    modId: 'base',
  },
  {
    id: 'uuid-18',
    name: 'Graceful',
    description: 'Less likely to make noise when moving.',
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-7'], // Clumsy
    modId: 'base',
  },
  {
    id: 'uuid-19',
    name: 'Hard of Hearing',
    description: 'Reduced hearing range.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-31'], // Keen Hearing
    modId: 'base',
  },
  {
    id: 'uuid-20',
    name: 'Hearty Appetite',
    description: 'Needs to eat more frequently.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-35'], // Light Eater
    modId: 'base',
  },
  {
    id: 'uuid-21',
    name: 'Hemophobic',
    description:
      'Becomes stressed and panics when performing first aid on self or others.',
    cost: 5,
    type: 'negative',
    incompatibleWith: ['uuid-11'], // Desensitized
    modId: 'base',
  },
  {
    id: 'uuid-22',
    name: 'High Thirst',
    description: 'Gets thirsty faster.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-34'], // Low Thirst
    modId: 'base',
  },
  {
    id: 'uuid-23',
    name: 'Inconspicuous',
    description: 'Less likely to be spotted by zombies.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-8'], // Conspicuous
    modId: 'base',
  },
  {
    id: 'uuid-24',
    name: 'Keen Hearing',
    description: 'Larger hearing range.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-19'], // Hard of Hearing
    modId: 'base',
  },
  {
    id: 'uuid-25',
    name: 'Light Eater',
    description: "Doesn't need to eat as frequently.",
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-20'], // Hearty Appetite
    modId: 'base',
  },
  {
    id: 'uuid-26',
    name: 'Low Thirst',
    description: "Doesn't get thirsty as often.",
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-22'], // High Thirst
    modId: 'base',
  },
  {
    id: 'uuid-27',
    name: 'Obese',
    description: '-2 Fitness, reduced running speed, low endurance.',
    cost: 10,
    type: 'negative',
    incompatibleWith: ['uuid-4', 'uuid-17', 'uuid-50'], // Athletic, Fit, Very Underweight etc.
    modId: 'base',
  },
  {
    id: 'uuid-28',
    name: 'Out of Shape',
    description: '-1 Fitness.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-4', 'uuid-17'], // Athletic, Fit
    modId: 'base',
  },
  {
    id: 'uuid-29',
    name: 'Overweight',
    description: '-1 Fitness, reduced running speed.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-4', 'uuid-17'],
    modId: 'base',
  },
  {
    id: 'uuid-30',
    name: 'Pacifist',
    description: 'Less XP from weapon kills.',
    cost: 4,
    type: 'negative',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-31',
    name: 'Prone to Illness',
    description: 'More prone to catching diseases.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-41'], // Resilient
    modId: 'base',
  },
  {
    id: 'uuid-32',
    name: 'Resilient',
    description: 'Less prone to disease and recovers faster from illness.',
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-31'], // Prone to Illness
    modId: 'base',
  },
  {
    id: 'uuid-33',
    name: 'Short Sighted',
    description: 'Smaller view distance.',
    cost: 2,
    type: 'negative',
    incompatibleWith: ['uuid-21'], // Eagle Eyed
    modId: 'base',
  },
  {
    id: 'uuid-34',
    name: 'Sleepyhead',
    description: 'Needs more sleep and gets tired faster.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-52'], // Wakeful
    modId: 'base',
  },
  {
    id: 'uuid-35',
    name: 'Slow Healer',
    description: 'Recovers slowly from injuries and illness.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-13'], // Fast Healer
    modId: 'base',
  },
  {
    id: 'uuid-36',
    name: 'Slow Learner',
    description: '-30% XP gain in all skills.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-14'], // Fast Learner
    modId: 'base',
  },
  {
    id: 'uuid-37',
    name: 'Slow Reader',
    description: 'Takes longer to read skill books.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-15'], // Fast Reader
    modId: 'base',
  },
  {
    id: 'uuid-38',
    name: 'Smoker',
    description: 'Needs to smoke regularly or becomes stressed.',
    cost: 4,
    type: 'negative',
    incompatibleWith: [],
    modId: 'base',
  },
  {
    id: 'uuid-39',
    name: 'Strong',
    description: '+4 Strength, higher knockback and carry weight.',
    cost: -10,
    type: 'positive',
    incompatibleWith: ['uuid-16', 'uuid-51'], // Feeble, Weak
    modId: 'base',
  },
  {
    id: 'uuid-40',
    name: 'Stout',
    description: '+2 Strength.',
    cost: -6,
    type: 'positive',
    incompatibleWith: ['uuid-16', 'uuid-51'],
    modId: 'base',
  },
  {
    id: 'uuid-41',
    name: 'Thin-skinned',
    description: 'More prone to scratches, lacerations and bites.',
    cost: 8,
    type: 'negative',
    incompatibleWith: ['uuid-48'], // Thick Skinned
    modId: 'base',
  },
  {
    id: 'uuid-42',
    name: 'Thick Skinned',
    description: 'Less chance of scratches, lacerations and bites.',
    cost: -8,
    type: 'positive',
    incompatibleWith: ['uuid-41'], // Thin-skinned
    modId: 'base',
  },
  {
    id: 'uuid-43',
    name: 'Underweight',
    description: '-1 Fitness, low strength and low carry weight.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-4', 'uuid-17'],
    modId: 'base',
  },
  {
    id: 'uuid-44',
    name: 'Very Underweight',
    description: '-2 Fitness, very low strength and carry weight.',
    cost: 10,
    type: 'negative',
    incompatibleWith: ['uuid-4', 'uuid-17'],
    modId: 'base',
  },
  {
    id: 'uuid-45',
    name: 'Wakeful',
    description: 'Needs less sleep.',
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-34'], // Sleepyhead
    modId: 'base',
  },
  {
    id: 'uuid-46',
    name: 'Weak',
    description: '-2 Strength.',
    cost: 6,
    type: 'negative',
    incompatibleWith: ['uuid-39', 'uuid-40'], // Strong, Stout
    modId: 'base',
  },
  {
    id: 'uuid-47',
    name: 'Weak Stomach',
    description: 'Higher chance of food illness.',
    cost: 3,
    type: 'negative',
    incompatibleWith: ['uuid-29'], // Iron Gut
    modId: 'base',
  },
  {
    id: 'uuid-48',
    name: 'Iron Gut',
    description: 'Lower chance of food illness.',
    cost: -3,
    type: 'positive',
    incompatibleWith: ['uuid-47'],
    modId: 'base',
  },
  // Profissões como traits (opcional)
  {
    id: 'uuid-49',
    name: 'Lucky',
    description: 'Somewhat luckier.',
    cost: -4,
    type: 'positive',
    incompatibleWith: ['uuid-50'],
    modId: 'base',
  },
  {
    id: 'uuid-50',
    name: 'Unlucky',
    description: 'Somewhat unluckier.',
    cost: 4,
    type: 'negative',
    incompatibleWith: ['uuid-49'],
    modId: 'base',
  },
  // Adicione mais se usar mods como Brita, etc.
] as const
