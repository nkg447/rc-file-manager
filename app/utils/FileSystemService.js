const path = require('path');
const fs = require('fs');
const os = require('os');
const HOME_DIR = os.homedir();
const USERNAME = os.userInfo().username;
const TRASH_DIR = path.join(HOME_DIR, '.local/share/Trash/files');
const shell = require('electron').shell;
import {
  faEject,
  faHome,
  faDesktop,
  faDownload,
  faMusic,
  faImages,
  faPhotoVideo,
  faTrash,
  faFile
} from '@fortawesome/free-solid-svg-icons';

const getMountedDevices = () => {
  // mounted devices
  const mountedDevices = {};
  const mountingPath =
    process.platform === 'darwin' ? `/Volumes` : `/media/${USERNAME}/`;
  fs.readdirSync(mountingPath, {
    withFileTypes: true
  }).forEach(file => {
    mountedDevices[file.name] = {
      path: path.join(mountingPath, file.name),
      external: true,
      icon: faEject
    };
  });
  return mountedDevices;
};

const getHomeDirectories = () => {
  const dirs = {
    Home: { path: HOME_DIR, icon: faHome },
    Desktop: { path: path.join(HOME_DIR, 'Desktop'), icon: faDesktop },
    Documents: { path: path.join(HOME_DIR, 'Documents'), icon: faFile },
    Downloads: { path: path.join(HOME_DIR, 'Downloads'), icon: faDownload },
    Music: { path: path.join(HOME_DIR, 'Music'), icon: faMusic },
    Pictures: { path: path.join(HOME_DIR, 'Pictures'), icon: faImages },
    Videos: { path: path.join(HOME_DIR, 'Videos'), icon: faPhotoVideo },
    Trash: {
      path: TRASH_DIR,
      icon: faTrash
    }
  };
  const availableDirs = {};
  Object.keys(dirs)
    .filter(key => fs.existsSync(dirs[key].path))
    .forEach(key => (availableDirs[key] = dirs[key]));
  return availableDirs;
};

const deleteFile = (path, permanent = false) => {
  if (!permanent) shell.moveItemToTrash(path);
  else fs.unlinkSync(path);
};

export default {
  getMountedDevices,
  getHomeDirectories,
  deleteFile,
  TRASH_DIR
};
