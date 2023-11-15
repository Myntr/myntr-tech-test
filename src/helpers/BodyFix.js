export default class BodyFix {
  constructor(useGlobalDimmer = false) {
    this.scrollPosition;
    this.globalDimmer = false;
    this.useGlobalDimmer = useGlobalDimmer;
  }

  setBodyFixed() {
    this.scrollPosition = window.scrollY;

    document.body.classList.add('no-scroll');
    document.body.style.top = `-${this.scrollPosition}px`;

    if (this.useGlobalDimmer) {
      if ( !this.globalDimmer ) {
        this.globalDimmer = document.querySelector('.GlobalDimmer');
      }
      this.globalDimmer.classList.remove('hidden');
      this.globalDimmer.addEventListener('click', this.handleGlobalDimmerClick);
    }
  }

  removeBodyFixed() {
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('top');

    if (this.scrollPosition) {
      window.scrollTo(0, this.scrollPosition);
    }

    if (this.useGlobalDimmer) {
      this.globalDimmer.classList.add('hidden');

      this.globalDimmer.removeEventListener('click', this.handleGlobalDimmerClick);
    }
  }

  handleGlobalDimmerClick() {
    const dimmerClickEvent = new CustomEvent('globalDimmer:click');
    window.dispatchEvent(dimmerClickEvent);
  }
}
