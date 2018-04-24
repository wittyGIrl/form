import {$, trim} from '../utils';

function fromHtml(html){
  var root = $('#root');
  root.append(content);
  var components = content.find('[x-options]');
  components.each(function (i, c) {
    var options = trim($(c).attr('x-options'));

    if (options[0] !== '{') {
        options = '{' + options + '}';
    }
    var opt = (new Function("return " + options))();

  });
}
