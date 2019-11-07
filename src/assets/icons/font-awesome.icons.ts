import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export class FaIconsComponent {
  constructor() { }
  public static init() {
    library.add(faSpinner);
  }
}
