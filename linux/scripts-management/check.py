# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is TelaSocial Monitor Script 
#
# The Initial Developer of the Original Code is
# Marcio S. Galli - Taboca 
# Portions created by the Initial Developer are Copyright (C) 2010
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#  Marcio Galli - mgalli@taboca.com
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****

# Original Copyright (C) 2010 Marcio S Galli 
# This script monitors a PID usage of CPU using top command in interactive mode. 
# This is to be used in a crontab 

import subprocess
import xml.dom.minidom
from xml.dom.minidom import parse, parseString, getDOMImplementation

class CheckProcess():

    def __init__(self):
        print "1" 
 
    def usage(self, lockPIDStr):

        self.process = subprocess.Popen("top -o cpu -l 6 -n 5 -ca -p '$aaaaaa ===$cccc%=== $bbbbbbbbbbbbbbbbbbbbbbb' ",
                                        shell=True,
                                        stdout=subprocess.PIPE,
                                        )

        self.stdout_list = self.process.communicate()[0].split('\n')
        
        ii = 0 
        av = 0

	for item in self.stdout_list:
		print item
		if item.find(lockPIDStr) > -1:
                   ii+=1
                   print 'Item= ' + item
                   items = item.split("===")
                   for token in items: 
                       if token.find("%") > -1: 
                          mmtoken = token.split("%")
			  print "item(" + mmtoken[0] +")"
                          av += float(mmtoken[0])
        if ii>0: 
          return float(av/ii) 
        else: 
          return -1
  
 
def main():
   
   check_process = CheckProcess()

   telapid = lockparse() 
 
   if int(telapid) < 0:
      print "No such TelaSocial process..."
      subprocess.Popen("python daemon.py",
                                        shell=True,
                                        stdout=subprocess.PIPE,
                                        )
      

   else: 
      print "Current TelaSocial PID = " + str(telapid)

      used_memory = check_process.usage( telapid )
      
      if used_memory > -1: 
         print "Process exists, and Memory in use is " + str(used_memory)
      else: 
         try: 
           os.kill(telapid,0)
         except: 
           print "Process does not exist, need to clean the /telasocial.log" 
           

def getText(nodelist):
    rc = ""
    for node in nodelist:
        rc = rc + node.data
    return rc


def lockparse():

    try : 
      domfile   = parse("/telasocial.log")
      pidNode   = domfile.getElementsByTagName("telasocialpid")[0]
      telapid   = getText(pidNode.childNodes)
      return telapid
    except : 
      return -1
    

if __name__ == '__main__':
        main()


