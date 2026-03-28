# Git

## Letzte Commits squashen

Wenn mehrere Test-Commits entstanden sind und am Ende alles funktioniert, kannst du sie zu einem einzelnen Commit zusammenfassen:

```sh
git rebase -i HEAD~2
git commit --amend -m "Neue Commit-Message"
git push --force-with-lease
```

## Auf einen bestimmten Commit zuruecksetzen

Wenn du lokal auf einen bestimmten Commit zurueck willst:

```sh
git reset --soft <commit-id>
git reset --hard <commit-id>
```

`--soft` behaelt deine Aenderungen lokal, `--hard` verwirft sie.

Wenn auch das Remote-Repo auf diesen Stand gesetzt werden soll:

```sh
git push --force-with-lease
```
