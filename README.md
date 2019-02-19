# README

### How to Use
* right click to "Convert cron to yaml"

### Example
```Cron Entries
# Prune the logs nightly
0 0 * * * /bin/bash /root/cronjobs/prune_log.sh

# Log watcher
*/5 * * * * /var/www/common/scripts/log_watcher.php
```

```YAML
cronjob_/root/cronjobs/prune_log.sh:
  cron.present:
    - name: /bin/bash /root/cronjobs/prune_log.sh
    - user: root
    - minute: 0
    - hour: 0
    - comment: Prune the logs nightly

cronjob_/var/www/common/scripts/log_watcher.php:
  cron.present:
    - name: /var/www/common/scripts/log_watcher.php
    - user: root
    - minute: '*/5'
    - comment: Log watcher
```
### Salt reference:

##salt.states.cron.present
https://docs.saltstack.com/en/latest/ref/states/all/salt.states.cron.html#salt.states.cron.present

 salt.states.cron.present(name, user=u'root', minute=u'*', hour=u'*', daymonth=u'*', month=u'*', dayweek=u'*', comment=None, commented=False, identifier=False, special=None)

