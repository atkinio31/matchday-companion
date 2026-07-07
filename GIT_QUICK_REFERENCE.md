# Git Quick Reference — Matchday Companion

The mental model: Git tracks your project as a series of snapshots (commits).
Snapshots live in three places — your working files, your local repository, and
the remote copy on GitHub. Every command moves or labels things between those three.

## Commands used to set up this project

| Command | What it does | One-time or recurring? |
|---|---|---|
| `git init` | Creates the local repository — a hidden `.git` folder that stores every snapshot. Before this, the folder is just files; after it, Git is watching. | One-time per project |
| `git config --global user.name "..."` / `user.email "..."` | Tells Git who you are, so every commit is stamped with your name and email. `--global` applies to all projects on this machine. | One-time per machine |
| `git add .` | Stages your changes — puts them in the waiting room for the next snapshot. The `.` means everything changed in this folder. Staging lets you choose what goes into a commit. | Before each commit |
| `git commit -m "message"` | Takes the snapshot: everything staged becomes a permanent, timestamped entry in local history, labelled with your message. | Every time |
| `git remote add origin <url>` | Tells the local repo where its GitHub counterpart lives, nicknamed `origin`. Nothing is sent yet — this just saves the destination. | One-time per project |
| `git branch -M main` | Renames the current branch to `main`, the convention GitHub expects. A branch is a named line of history. | One-time |
| `git push -u origin main` | Uploads local commits to GitHub. The `-u` links local `main` to GitHub's `main`, so afterwards plain `git push` knows where to go. | First push only |
| `git status` | Read-only health check: what has changed, what is staged, what is untracked. Costs nothing, tells you everything. | Whenever unsure |

## The everyday loop

1. Make changes
2. `git status` — see what you did
3. `git add .` — stage it
4. `git commit -m "what and why, in your own words"` — snapshot it
5. `git push` — publish to GitHub

## Useful next commands (Claude Code will use these too)

| Command | What it does |
|---|---|
| `git log --oneline` | Your history at a glance: one line per commit |
| `git diff` | Exactly what changed in your files since the last stage/commit |
| `git diff --staged` | What is about to go into the next commit |
| `git restore <file>` | Discard uncommitted changes to a file (careful — no undo) |
| `git pull` | Fetch and merge changes from GitHub (matters once you edit in two places) |

## The SAIL anchor

A commit is like versioning an Appian object — a named, recoverable point you can
inspect or return to — except Git snapshots the entire project at once, and the
history is yours to narrate. `git log` on this repo is a diary of you closing the
exact gap the person specification named.

## House rules for this project

- Commit in small pieces with messages in your own words, not Claude's.
- `git status` before every push; `.env.local` must never appear in it.
- The commit history is interview material — make it read like you.
