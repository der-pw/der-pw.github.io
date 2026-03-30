# Git

## Letzte Commits squashen

Wenn mehrere Test-Commits entstanden sind und am Ende alles funktioniert, kannst du sie zu einem einzelnen Commit zusammenfassen:

```sh
git rebase -i HEAD~2
git commit --amend -m "Neue Commit-Message"
git push --force-with-lease
```

## Historie komplett durch neuen Root-Commit ersetzen

Wenn nicht nur die letzten Commits zusammengefasst werden sollen, sondern die aktuelle Arbeitskopie als komplett neue Historie veroeffentlicht werden soll, ist ein neuer Root-Commit meist der sauberste Weg:

```sh
git checkout --orphan clean-main
git add -A
git commit -m "Initial import"
git branch -M clean-main main
git push --force-with-lease origin main
```

Damit wird der aktuelle Stand als neuer Startpunkt von `main` veroeffentlicht, ohne die alte Commit-Historie mitzunehmen.

Wichtig: Bestehende Klone oder Deployments, die noch auf einem alten Commit der vorherigen Historie stehen, koennen danach meist nicht mehr einfach per `git pull` aktualisiert werden. In solchen Faellen den Stand neu holen und den Branch hart auf `origin/main` setzen oder das Repo frisch klonen:

```sh
git fetch origin
git checkout main
git reset --hard origin/main
```

Wenn auf dem Server lokale Aenderungen liegen, muessen diese vorher gesichert werden, weil `git reset --hard` sie verwirft.

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
