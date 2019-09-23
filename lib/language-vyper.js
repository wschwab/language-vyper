'use babel';

import LanguageVyperView from './language-vyper-view';
import { CompositeDisposable } from 'atom';

export default {

  languageVyperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageVyperView = new LanguageVyperView(state.languageVyperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageVyperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-vyper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageVyperView.destroy();
  },

  serialize() {
    return {
      languageVyperViewState: this.languageVyperView.serialize()
    };
  },

  toggle() {
    console.log('LanguageVyper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
