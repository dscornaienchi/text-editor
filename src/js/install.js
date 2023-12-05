const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  // Store the event for later use
  let deferredPrompt = event;
  // Show the install button
  butInstall.removeAttribute('hidden');
  // Implement click event handler on the install button
  butInstall.addEventListener('click', async () => {
    butInstall.setAttribute('hidden', true);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Log the result
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  });
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed:', event);
});

