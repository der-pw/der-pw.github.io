# Disk einer VM erweitern

Beispielsweise eine klassiche Partition einer VM unter Proxmox.

Zu erst unter Proxox innerhalb der Hardwarkonfiguration die Partition erweitern.

In der Konsole der VM dann `lsblk` eingeben um zu checken, ob der Speicher zugewiesen wurde.
Dann `sudo fdisk  /dev/sda` (bei mir ist es /dev/sda)

```
Welcome to fdisk (util-linux 2.38.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

This disk is currently in use - repartitioning is probably a bad idea.
It's recommended to umount all file systems, and swapoff all swap
partitions on this disk.


Command (m for help): d

Selected partition 1
Partition 1 has been deleted.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-62914559, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-62914559, default 62914559):

Created a new partition 1 of type 'Linux' and of size 30 GiB.
Partition #1 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: N
```
- d für delete Partition
- n für neue Partition
- p für primary Partition
- 1 für die Partitionsnummer (/dev/sda(1/2/3/...))
- Remove Signature wenn ext4 mit N bestätigen

abschließend mit 
```
Command (m for help): w
```
die Partitionstabelle schreiben.

Mit `fdisk -l /dev/sda` kann man sich das Ergebnis ansehen.
Danach muss man das ext4 Dateisystem noch mittels `resize2fs /dev/sda1` erweitern.