const bar = document.getElementById('js-progressbar');
const uploadForm = document.querySelector('#uploadForm');
const uploadFile = document.querySelector('#uploadFile');
const uploadComplete = document.querySelector('.uk-text-middle');
const uploadComplete2 = document.querySelector('.uk-link');

UIkit.upload('.js-upload', {
  url: `http://localhost:3000${uploadForm.getAttribute('action')}`,
  multiple: true,
  name: uploadFile.getAttribute('name'),

  beforeSend: function () {
    console.log('beforeSend', arguments);
  },
  beforeAll: function () {
    console.log('beforeAll', arguments);
  },
  load: function () {
    console.log('load', arguments);
  },
  error: function () {
    console.log('error', arguments);
  },
  complete: function () {
    console.log('complete', arguments);
  },

  loadStart: function (e) {
    console.log('loadStart', arguments);

    bar.removeAttribute('hidden');
    bar.max = e.total;
    bar.value = e.loaded;
  },

  progress: function (e) {
    console.log('progress', arguments);
    bar.max = e.total;
    bar.value = e.loaded;
  },

  loadEnd: function (e) {
    console.log('loadEnd', arguments);
    bar.max = e.total;
    bar.value = e.loaded;
  },

  completeAll: function () {
    console.log('completeAll', arguments);
    uploadComplete.textContent = 'upload完了しました';
    uploadComplete2.textContent = '';
    setTimeout(function () {
      bar.setAttribute('hidden', 'hidden');
    }, 1000);
  },
});
