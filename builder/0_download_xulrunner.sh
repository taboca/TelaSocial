#!/usr/bin/env python

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
# The Original Code is chromeless.
#
# The Initial Developer of the Original Code is
# Mozilla Foundation
# Portions created by the Initial Developer are Copyright (C) 2010
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#    Marcio Galli <mgalli@mgalli.com>
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


# A small script to invoke cfx from the jetpack platform with proper arguments.
# accepts a single argument on the command line which is the path to the
# "entry point HTML" - that which should be used as the browser's UI.

import os,sys,shutil

# the current chromeless version.  should be bumped when a release is tagged,
# really we an immutable global accessible by all includes submodules, but
# using the environment for this seems wonky.  ideas welcome.
TELASOCIAL_VERSION = "0.2";

# set the cuddlefish "root directory" for this process if it's not already
# set in the environment
cuddlefish_root = os.path.dirname(os.path.abspath(sys.argv[0]))

if 'CUDDLEFISH_ROOT' not in os.environ:
    os.environ['CUDDLEFISH_ROOT'] = cuddlefish_root

# set the "build directory", where we'll output built artifacts, download xulrunner,
# etc.
build_dir = os.path.join(cuddlefish_root, "build")

# add our own python-lib path to the python module search path.
python_lib_dir = os.path.join(cuddlefish_root, "impl")
if python_lib_dir not in sys.path:
    sys.path.append(python_lib_dir)

# now export to env so sub-processes get it too
if 'PYTHONPATH' not in os.environ:
    os.environ['PYTHONPATH'] = python_lib_dir
elif python_lib_dir not in os.environ['PYTHONPATH'].split(os.pathsep):
    paths = os.environ['PYTHONPATH'].split(os.pathsep)
    paths.insert(0, python_lib_dir)
    os.environ['PYTHONPATH'] = os.pathsep.join(paths)

import mozfetcher
f = mozfetcher.Fetcher(build_dir)
if (f.needs_fetch()):
    print "Missing prerequisites!  I must download xulrunner to run.  Doing so"
    f.run()

