# Ant Colony

An ant colony simulation that runs in the browser (p5.js). It started as a Processing (Java) sketch, which is kept in `archive/`.

**▶ Play it live: [charlesrepo.github.io/ant-colony](https://charlesrepo.github.io/ant-colony/)**

## Project structure

```
index.html        the simulation: open this page
app/              everything the page needs
  src/            simulation source (ES modules)
  dist/           built bundle (committed, so index.html works without building)
  vendor/         optional local copy of p5.min.js
  loader.js       loads p5 and the bundle
  style.css       page and control panel styles
  package.json    build tooling (webpack)
archive/          the original Processing sketch, the first one-file p5 port and the old docs
LICENSE           GNU GPL v2
```

## How to run

- **Just play:** go to [the live version](https://charlesrepo.github.io/ant-colony/), or open `index.html` locally in a browser. Serving the folder with a simple HTTP server (or VS Code's Live Server) is recommended. p5 loads from `app/vendor/p5.min.js` if you put a copy there, otherwise from a CDN.
- **Develop:** the build tooling lives in `app/`:
  - `cd app`
  - `npm install`
  - `npm run dev` starts a dev server with live reload and opens `http://localhost:5173/`.
  - `npm run watch` rebuilds `app/dist/bundle.js` on every change; serve the repository root with your own static server (such as Live Server).
  - `npm run build` makes a production build in `app/dist/`; commit it so `index.html` keeps working without a build step.
- **Original Processing version:** see `archive/README.md`.

## How to play

The canvas is the ground the colony lives on; everything you can do is in the control panel beside it.

| Control | What it does |
| --- | --- |
| **+1 ant / +10 ants** | Adds ants at the nest. Disabled once 100 ants are alive. |
| **Biscuit / Sugar / Toxic** (keys **1** / **2** / **3**) | Picks a food. Each click on the ground then drops a pile of it; place as many piles of each kind as you like. Piles are kept clear of the edges and of the two holes. |
| **Antlion** switch | Releases the antlion from its pit. Switching it off sends it back home. |
| **Human** switch | While on, clicking an ant steps on it. |
| **Trails** switch (key **T**) | Shows or hides the pheromone trails on the ground. Ants still lay and follow them while they're hidden. |
| **Esc** | Puts away the selected food or the human. Clicking the selected food again does the same. |
| **Palette** | Loam (dark) or Dune (light). Your choice is remembered in this browser. |
| **Reset** | Starts over: 30 ants, no food, no trails or bodies, antlion off, all counts back to zero. |

Only one click tool is active at a time: picking a food switches the human off, and switching the human on puts the food away. A banner over the ground says what a click will do; it fades after 10 seconds and comes back whenever you pick a tool.

The panel also shows:
- **Ants alive** out of 100, and the current hatching rate (for example "+3 every ~2.5s", or "colony full").
- **Stats**: *Stored* (food pieces brought into the nest), *Born* (ants hatched), *Old age*, *Toxic* (ants that ate toxic food), *Eaten* (by the antlion) and *Crushed* (stepped on).
- What the antlion is doing (asleep, prowling, chasing, driven back, full and resting…).
- A key to the trail colours.

## Rules of the world

Times below assume 60 frames per second. The simulation counts frames, so on a slow machine everything runs proportionally slower.

### The colony

- The colony starts with **30 ants** at the nest, and there is no food until you place some.
- At most **100 ants can be alive** at once. Dead ants don't count.
- **New ants hatch on their own**, so the colony recovers even if every ant is lost. With an empty nest, one ant hatches every 4–14 seconds, at random.
- **Food speeds up hatching.** Every piece brought home goes into the nest's reserve: sugar adds 2, biscuit adds 1, up to 60.
  - Every 8 in reserve adds the base hatching rate again, up to 6× as often.
  - Every 10 in reserve adds one more ant per hatching, up to 5 at once.
  - Each newborn eats 1.5 from the reserve, so a boom fades once food stops coming in.
- Newborns climb out of the nest pale and darken over about 15 seconds. They start foraging straight away.
- **Old age:** an ant lives 3 minutes plus a random 0–1 minute. When its time is up it drops whatever it carries, slows to a stop over 5 seconds and dies. The starting colony has ants of mixed ages, so they don't all die at once.

### Foraging and food

- A pile holds 25 pieces. An ant takes one piece per trip and carries it home; an empty pile disappears.
- Ants can smell a pile from a distance: sugar from 150 px, biscuit and toxic food from 100 px.
- **Sugar is worth more than biscuit.** A searching ant goes for, in order:
  1. a sugar pile it can smell,
  2. a sugar trail,
  3. a biscuit (or toxic) pile it can smell,
  4. a biscuit trail,
  5. otherwise it wanders.

  An ant on its way to biscuit changes course as soon as it crosses a sugar trail. After losing the sugar scent it keeps looking for sugar for 2.5 seconds before settling for biscuit again.
- Ants carrying food follow the home trail and also keep a sense of where the nest is. Within about 110 px of the nest they head straight in.

### Pheromone trails

Every ant lays a trail along the centre of its path. Which trail it lays depends on what it is doing:

| Trail | Colour | Laid by | What other ants do with it |
| --- | --- | --- | --- |
| **Home** | dark brown | ants out searching | Ants carrying food follow it back to the nest. |
| **Biscuit** | amber | ants carrying biscuit home | Searching ants follow it out to the biscuit. |
| **Sugar** | pale cream | ants carrying sugar home | Searching ants follow it, and prefer it over biscuit (see above). |
| **Toxic** (warning) | green | poisoned ants | Searching ants steer away from it. An ant that crosses a strong patch ignores toxic piles for 10 seconds. |
| **Danger** | red | ants being chased by the antlion; burst from an ant that is eaten or stepped on | Ants that smell it get alarmed and come to fight (see *Fighting back*). |

- Trails start strongest near where the ant set off, so ants can tell which way leads home or to food.
- Trails fade on their own, unevenly, in patches. A trail that ants keep using stays strong.
  - Home trails are laid by every searching ant, so they fade fastest: gone within about 15–40 seconds.
  - Food and warning trails hold for a few seconds, then break up and linger faintly. They're mostly gone within a minute.
  - Danger trails are volatile and clear within about 5–10 seconds.

### Toxic food

- Ants can't tell toxic food from ordinary food until poisoned ants have marked the area with a warning trail.
- An ant that eats toxic food keeps walking for about 1.3 seconds, then slows to a stop over 5 seconds and dies. It leaves a spreading stain.
- While dying it lays the green warning trail, which keeps other ants away from the pile for a while.

### The antlion

- It lives in the funnel-shaped pit and comes out when switched on.
- It prowls slowly and chases the nearest ant within 300 px. Ants that are fighting it are ignored.
- **What it can eat:** anything touching its head or jaws, including dead bodies. After each meal it pauses briefly to chew.
- **Giving up:** if it can't catch an ant within 10 seconds, it leaves that ant alone for 5 seconds.
- **When it's full:** after eating more than 10 ants within one minute, it goes back to its pit and rests for 30 seconds. Switching it off and on doesn't cut the rest short.
- Switching it off sends it back into its pit.

### Fighting back

- **Fleeing:** an ant within 95 px of the antlion runs away, laying a danger trail. A fleeing ant slides along walls and breaks out sideways if cornered.
- **Attacking:** ants attack when the antlion is within 170 px and at least 4 other ants are within 50 px of them.
- **Alarmed ants:** ants that smelled a danger trail in the last 5 seconds follow it toward the antlion. They attack when it's within 140 px and at least one nestmate is beside them.
- **Breaking off:** attackers give up if the antlion gets more than 230 px away, or if they lose support. That means fewer than 2 nestmates nearby, or none at all for alarmed ants.
- Attackers can't be eaten. They keep just outside the antlion's body, never underneath it, darting in and out.
- **Driving it off:** 5 attackers on it at once send the antlion back to its pit to hide for 7 seconds. If it's still switched on, it comes out again after that.

### The human

- A click steps on every living ant within 13 px of the click.
- A crushed ant releases a small burst of danger pheromone.
- Ants within 80 px bolt away for under a second.

### Bodies

- Ants that die of poison, old age or being stepped on stay where they fell for 30 seconds. Then the body, and any stain, crumbles away over 4 seconds. The antlion may eat a body before then.
- Each kind of death looks different:
  - Poisoned: a spreading green stain.
  - Old age: curled up and slightly greyed.
  - Crushed: flattened with a small smear.

### The ground

- Ants and the antlion stay inside the edges of the field.
- Ants avoid the antlion's pit and can't enter it.

## Code layout

- Classes live in `app/src/` and are bundled by webpack into `app/dist/bundle.js`. p5 is an external global, loaded by `app/loader.js` from `app/vendor/p5.min.js` if present, otherwise from a CDN.
- Most of the numbers above are named constants at the top of the file that uses them:
  - `Ant.js`: senses, poison, lifespan, alarms.
  - `Colony.js`: hatching, swarm size.
  - `Predator.js`: antlion appetite and patience.
  - `Pheromones.js`: trail fading.
  - `Food.js`: smell range and value.
  - `Human.js`: stomp size.
  - `config.js`: field size and ant limits.
- The control panel is HTML (`index.html`), wired up in `app/src/ControlPanel.js`.
- Colour palettes are defined in two places with matching ids: panel colours in `app/style.css`, canvas colours in `app/src/theme.js`.
