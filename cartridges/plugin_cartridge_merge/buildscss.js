/**
 * This build script will run automatically before compile:scss
 * It will comment out @import statements from the merge cartridge
 * for references to plugins that are not defined in the package.json "paths"
 */

var fs = require('fs');
var path = require('path');

// SCSS path
var scssSourcePath = 'cartridges/plugin_cartridge_merge/cartridge/client/default/scss/';

// Get the plugins from package.json
var plugins = getPluginsFromPackageJson();

// For each scss file in the cartridge, process file
getFilesFromDir(scssSourcePath, ['.scss']).forEach(function (fileName) {
    console.log('Processed file: ' + processSCSSFile(scssSourcePath + fileName));
});

/**
 * Get the name of the plugin that is being imported
 * @param {string} scssLine - Request object
 * @returns {string} - returns the plugin cartridge name
 */
function getPluginNameFromSCSSImport(scssLine) {
    var pluginName = '';
    var tildeIndex = scssLine.indexOf('~');
    if (tildeIndex > -1) {
        var forwardSlashIndex = scssLine.indexOf('/', tildeIndex);
        if (forwardSlashIndex > 0) {
            pluginName = scssLine.substring(tildeIndex + 1, forwardSlashIndex);
        }
    }
    return pluginName;
}

/**
 * Get plugin cartridges defined in package.json
 * @returns {Object} - returns the JSON for the "paths" in package.json
 */
function getPluginsFromPackageJson() {
    var packageJson;
    try {
        packageJson = fs.readFileSync('package.json', 'utf8');
    } catch (ex) {
        console.log('Exception: package.json not found in root folder.');
        process.exit(1);
    }
    return JSON.parse(packageJson).paths;
}

/**
 * Process each SCSS file found in cartridge
 * For each file, comment out the @import if the plugin cartridge
 * is not in the package.json path
 * @param {string} filePath - The path and filename to the scss file
 * @returns {string} - The path and filename to the scss file processed
 */
function processSCSSFile(filePath) {
    var scssFileArray = [];
    var filePathTemp = filePath + '.temp';
    // Remove temp files if already exists
    if (fs.existsSync(filePathTemp)) {
        fs.unlinkSync(filePathTemp);
    }

    var scssLineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filePath)
    });

    scssLineReader.on('line', function (scssLine) {
        // Check if the scss line has a import with a package.json path (ex. ~wishlist)
        var pluginName = getPluginNameFromSCSSImport(scssLine);
        if (scssLine.indexOf('@import') > -1 && !plugins.hasOwnProperty(pluginName) && !scssLine.startsWith('//')) {
            // If scss line has import statement and references plugin not in path
            // then comment out the import statement
            scssFileArray.push('//' + scssLine);
        } else if (scssLine.indexOf('@import') > -1 && plugins.hasOwnProperty(pluginName) && scssLine.startsWith('//')) {
            // If scss line has import statement and references plugin is in path
            // then un-comment out the import statement
            scssFileArray.push(scssLine.replace('//', ''));
        } else {
            // else just write same line from orginal scss
            scssFileArray.push(scssLine);
        }
    });

    // After new temp file is written and closed, rename to original scss
    scssLineReader.on('close', function () {
        var newSCSSStream = fs.createWriteStream(filePathTemp, { flags: 'a' });
        newSCSSStream.on('open', function () {
            newSCSSStream.write(scssFileArray.join('\r\n'));
            // Add end of source newline
            newSCSSStream.write('\r\n');
            newSCSSStream.end();
        });
        newSCSSStream.on('close', function () {
            fs.renameSync(filePathTemp, filePath);
        });
    });

    return filePath;
}

/**
 * Get the path + file name of all SCSS files in cartridge
 * @param {string} dir - The base path to the scss files in cartridge
 * @param {string} fileTypes - list of file types to look for (ex. '.scss')
 * @returns {string} - list of scss files
 */
function getFilesFromDir(dir, fileTypes) {
    var filesToReturn = [];
    /**
     * Lookup recursively
     * @param {string} currentPath - Current path in recursive lookup
     */
    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i = 0; i < files.length; i++) {
            var curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) !== -1) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    }
    walkDir(dir);
    return filesToReturn;
}
