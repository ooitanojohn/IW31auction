" タブ設定
let g:airline#extensions#tabline#enabled = 1 " タブラインを表示
let g:airline#extensions#tabline#buffer_idx_mode = 1 " タブに番号を表示
" 行番号を表示
set number
"Tabをスペース2つに展開&Tabの設定
set tabstop=2
set autoindent
set expandtab
set shiftwidth=2
"日本語化
set helplang=ja
"シンタックスハイライトを有効
syntax enable
"クリップボードを有効
set clipboard=unnamedplus

" キーバインド esc → jj
inoremap <silent> jj <esc>

" インデント
let g:indent_guides_enable_on_vim_startup = 1

"ファイル変更があった際に自動読み込み変更
set autoread

" html format
:filetype indent on
:set filetype=html           
:set smartindent           


