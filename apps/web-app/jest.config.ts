module.exports = {
  displayName: 'web-app',
  preset: '../../jest.preset.js',

  transform: {
    '^.+\\.svelte$': 'svelte-jester',
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'svelte'],
  coverageDirectory: '../../coverage/apps/web-app',
  extensionsToTreatAsEsm: ['.svelte'],
  testEnvironment: 'jsdom',
};
