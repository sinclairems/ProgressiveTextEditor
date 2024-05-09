// const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// window.addEventListener('beforeinstallprompt', (event) => {
//   window.deferredPrompt = event;
//   // Show the install button
//   butInstall.classList.toggle('hidden', false); 
// });

// butInstall.addEventListener('click', async () => {
//   // Show the install prompt
//   promptEvent.prompt();
//   // Wait for the user to respond to the prompt
//   const { outcome } = await promptEvent.userChoice;
//   console.log('User response to install: ${outcome}');
//   // Reset deferred prompt variable
//   promptEvent = null;
// });

// window.addEventListener('appinstalled', (event) => {
//   console.log('PWA was installed!', event);
// });


const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  // Clear prompt
  window.deferredPrompt = null;
}); 