module.exports = function (grunt) {
  grunt.initConfig({
    shell: {
      next_dev: 'export FIRESTORE_EMULATOR_HOST="localhost:9100"; npm run dev',
      fb_start: "firebase emulators:start --import=./fbexport --export-on-exit",
    },
  });

  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", ["shell:fb_start", "shell:next_dev"]);
};
