# CLI: Create new vs Add to existing

| Flow | Entry | What gets written |
|------|--------|-------------------|
| **Create new** | `npx rizzo-css init` → “Create new project”, or `init --yes` | Scaffold (base + template), CSS, fonts, icons, components, **rizzo-css.json**, **LICENSE-RIZZO**, **README-RIZZO.md**, **.gitignore**. Stylesheet link is already in the scaffold. |
| **Add to existing** | `npx rizzo-css add` or `init` → “Add to existing” | CSS, fonts, icons, chosen components, **rizzo-css.json**, optionally **RIZZO-SNIPPET.txt** (link + theme). No scaffold, no LICENSE/README/.gitignore. User adds the `<link>` (CLI prints it). |

**Init vs add (short):** Create new = full scaffold + config + license/readme/gitignore. Add = drop-in CSS + components + config only; you add the stylesheet link yourself.

**Options:** Init: `--yes`, `--path <dir>` (project directory; scaffold and install run there), `--framework`, `--template` (full|minimal|manual), `--package-manager`, `--install` / `--no-install`. Interactive create-new: project location = **current directory** or **enter path or project name** (one prompt; relative or absolute; empty = current directory). Add: `--path` (CSS target dir), `--framework`, `--install-package`, `--no-snippet`, `--readme`, `--force`, `--vanilla-js`. With `init --yes --framework vanilla`, default template is **minimal** (not full). Config **rizzo-css.json** can include `theme`; it is merged (unknown keys preserved). **doctor** checks config, CSS path, and layout link.

**Add behavior:** Writes **RIZZO-SNIPPET.txt** by default (copy-paste link + theme); use `--no-snippet` to skip. If CSS already exists at target, prompts to overwrite unless `--force`. Vanilla + interactive components: prompt or `--vanilla-js` to copy `js/main.js`. **Create new in cwd:** If directory is not empty (e.g. package.json, src/, index.html), prompts “Continue? (y/n)”.
