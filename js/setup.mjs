export function setup(ctx) {
  ctx.settings.section('Data').add({
    type: 'button',
    name: 'reset-data',
    display: 'Reset Dialog State',
    onClick() {
      ctx.characterStorage.clear();
      SwalLocale.fire({
        icon: 'info',
        text: 'You will need to restart your game for this to take effect.'
      })
    }
  })

  ctx.onInterfaceReady(async ({ loadData, api }) => {
    const dboxByExample = mod.api.dbox.create('dbox-by-example', 
    {
      ...await loadData('data/dialog.data.json'),
      actions: [
        {
          id: 'randomSword',
          onReward: (quantity) => rollRandomSword(quantity),
          onRender(_type, quantity) {
            try {
              const wrap = document.createElement('span');
              const icon = document.createElement('img');
              icon.classList.add('mr-1');
              icon.style.height = '16px';
              icon.style.width = '16px';
              icon.src = cdnMedia('assets/media/main/question.svg');
              const count = document.createElement('span');
              count.classList.add('text-purple');
              count.textContent = `${formatNumber(quantity || 1)} x Random Sword`;
              wrap.append(icon, count);
              return wrap;
            } catch (e) {
              console.error(e);
            }
          }
        },
        {
          id: 'openLink',
          onAction: (url) => {
            openLink(url);
          }
        },
      ]
    }, ctx);

    document.querySelector('#combat-container').firstElementChild.after(dboxByExample.root);

    api({ d: dboxByExample });
  });
}

const swords = [
  'melvorD:Bronze_Sword',
  'melvorD:Iron_Sword',
  'melvorD:Steel_Sword',
  'melvorD:Black_Sword',
  'melvorD:Mithril_Sword',
  'melvorD:Adamant_Sword',
  'melvorD:Rune_Sword',
  'melvorD:Dragon_Sword',
  'melvorD:Ancient_Sword',
  'melvorD:Ice_Sword',
  'melvorD:Swordfish'
];

function rollRandomSword(quantity) {
  game.bank.addItemByID(swords[Math.floor(Math.random() * swords.length)], quantity, true);
}