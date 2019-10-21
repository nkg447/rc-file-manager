const path = require('path');
const fs = require('fs');
const os = require('os');
const HOME_DIR = os.homedir();
const USERNAME = os.userInfo().username;

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
      external: true
    };
  });
  return mountedDevices;
};

const getHomeDirectories = () => {
  const dirs = {
    Home: { path: HOME_DIR },
    Desktop: { path: path.join(HOME_DIR, 'Desktop') },
    Documents: { path: path.join(HOME_DIR, 'Documents') },
    Downloads: { path: path.join(HOME_DIR, 'Downloads') },
    Music: { path: path.join(HOME_DIR, 'Music') },
    Pictures: { path: path.join(HOME_DIR, 'Pictures') },
    Videos: { path: path.join(HOME_DIR, 'Videos') }
  };
  const availableDirs = {};
  Object.keys(dirs)
    .filter(key => fs.existsSync(dirs[key].path))
    .forEach(key => (availableDirs[key] = dirs[key]));
  return availableDirs;
};

const deleteFile = (path) => {
  fs.unlinkSync(path)
};

export default {
  getMountedDevices,
  getHomeDirectories,
  deleteFile
};
