# Tipps und Tricks in der Shell unter MacOS

## per SSH-Key zu remote-host verbinden

### Schlüsselpaar für SSH Login erzeugen
`ssh-keygen -t rsa -b 4096 -f ~/.ssh/key.pem`  
So werden der private key `key.pm` und der public-key `key.pem.pub` erzeugt.

### Kopieren des öffentlichen Schlüssels zum Remote-Server
`ssh-copy-id -i ~/.ssh/key.pub benutzer@<remote-host>`  
Der public key wird so in die Datei `~/.ssh/authorized_keys` hinzugefügt. 

### ssh Config
In der Konfiguration unter `~/.ssh/config` lässt sich der Pfad zum Schlüssel für den jeweiligen Host angeben.
```
Host <remote-host>
    User <username>
    HostName <hostname>
    Port 22 
    IdentityFile ~/.ssh/key.pem
    IdentitiesOnly yes
```

Danach kann man sich per `ssh <remote-host>` auf den entfernen Rechner verbinden, ohne dabei jedes Mal die Zugangsdaten einzugeben.