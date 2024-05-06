const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  // Save the event for later use
  let promptEvent = event;
  // Show the install button
  butInstall.style.display = "block"; 
});

butInstall.addEventListener('click', async () => {
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await promptEvent.userChoice;
  console.log('User response to install: ${outcome}');
  // Reset deferred prompt variable
  promptEvent = null;
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed!', event);
});
