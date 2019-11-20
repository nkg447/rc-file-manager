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

const path = require('path');
// const fs = require('fs');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const os = require('os');

const HOME_DIR = os.homedir();
const USERNAME = os.userInfo().username;
const TRASH_DIR = path.join(HOME_DIR, '.local/share/Trash/files');
const { shell } = require('electron');

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
  else
    rimraf(path, err => {
      console.log(`${path} deleted`);
    });
};

const copyFile = (sourcePath, destinationPath, cb = () => {}) => {
  fs.copy(sourcePath, destinationPath, err => {
    if (err) throw err;
    console.log(`${sourcePath} was copied to ${destinationPath}`);
    cb();
  });
};

const moveFile = (sourcePath, destinationPath, cb = () => {}) => {
  fs.move(sourcePath, destinationPath, err => {
    if (err) throw err;
    console.log(`${sourcePath} was moved to ${destinationPath}`);
    cb();
  });
};

const renameFile = (sourcePath, newPath, cb = () => {}) => {
  fs.renameSync(sourcePath, newPath);
  cb();
};

const isTrashDir = address => TRASH_DIR === address;

export default {
  getMountedDevices,
  getHomeDirectories,
  deleteFile,
  TRASH_DIR,
  isTrashDir,
  copyFile,
  moveFile,
  renameFile
};
