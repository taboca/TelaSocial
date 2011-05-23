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
# Armando Biagioni Neto
# Portions created by the Initial Developer are Copyright (C) 2010
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#  Marcio Galli - mgalli@taboca.com
#  Armando Neto - armando@armandoneto.com
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
import logging
import subprocess
import os
from time import sleep

LOG_FILENAME = '/var/log/telasocial.log'
#300MB = 300.000kB
MEMORY_LIMIT = 300000 

# create logger
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG,format=LOG_FORMAT)

def start_telasocial():
	try:
		#dont need to fork python
		subprocess.Popen('startx /usr/lib/taboca/telasocial',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		#workaround to wait X to be started to grab its pid
		sleep(5)
		logging.info('TelaSocial started with PID: ' + grab_pid())
	except:
		logging.error('Impossible to start X and Telasocial: ' + subprocess.communicate()[0])

def grab_pid():
	try:
		pidOfTelasocial = subprocess.Popen('pidof telasocial',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		telasocialPid = pidOfTelasocial.communicate()[0].rstrip('\n')
		#print 'telasocial pid: ' + telasocialPid
		return telasocialPid
	except:
		return ''

#invocate only if there is a process running
def memory_test(pid):
	command = 'cat /proc/'+pid+'/status'
	memoryOf = subprocess.Popen(command,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
	processStatus = memoryOf.communicate()[0].split('\n')

	for item in processStatus:
		if item.find('VmRSS:') > -1:
			#returns only the value in kiloBytes
			return item.lstrip('VmRSS:\t ').rstrip(' kB')

	
def check_running():
	#grab the pid
	telasocialPid = grab_pid()
	logging.info('telasocial running with PID: ' + telasocialPid)

	#there is a process running
	if telasocialPid != '':
		#so memory usage will be tested
		memoryUsage = memory_test(telasocialPid)
		
		if int(memoryUsage) > MEMORY_LIMIT:
			logging.warning('Overload. ' + memoryUsage + 'kB')
			try: 
				os.kill(int(telasocialPid),15)
				logging.info('process killed. Trying to restart')
				
				#workaround to wait X to be killed before restart
				sleep(5)
				#Starting Telasocial
				start_telasocial()
				
			except: 
				logging.debug('Process does not exist')
		else:
			logging.info('memory usage is OK: ' + str(memoryUsage) + 'kB')
		
	else:
		#nothing running
		logging.info('No such TelaSocial process. Trying to start')
		#Starting Telasocial
		start_telasocial()
		
			
if __name__ == '__main__':
	check_running()
