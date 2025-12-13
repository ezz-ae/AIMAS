<?php
/**
 * Plugin Name: AIMAS Search Terminal
 * Description: Adds a search-only AIMAS terminal via shortcode [aimas_search].
 * Version: 0.1.0
 * Author: Mahmoud Ezz
 */
if (!defined('ABSPATH')) exit;

function aimas_search_shortcode() {
  $api_base = get_option('aimas_api_base', '');
  ob_start(); ?>
  <div style="max-width:860px;margin:40px auto;padding:20px;border:1px solid #e5e5e5;border-radius:12px;">
    <div style="font-weight:700;font-size:22px;margin-bottom:10px;">AIMAS Protocol Terminal</div>
    <p style="margin-top:0;color:#555;">Search-only. Output is Fit Matrix + paths.</p>
    <button id="aimas_btn" style="padding:10px 14px;border-radius:10px;border:1px solid #111;background:#111;color:#fff;font-weight:700;">Search</button>
    <pre id="aimas_out" style="white-space:pre-wrap;margin-top:14px;background:#f7f7f7;padding:12px;border-radius:10px;"></pre>
    <script>
      (function(){
        const API_BASE = <?php echo json_encode($api_base); ?>;
        const btn = document.getElementById('aimas_btn');
        const out = document.getElementById('aimas_out');
        btn.addEventListener('click', async () => {
          out.textContent = '';
          if(!API_BASE){ out.textContent = 'Missing AIMAS API base (set in WP options).'; return; }
          const capsule = {
            actor_id: "anon",
            domain: "other",
            mode: "plan",
            captured_at: new Date().toISOString(),
            intent_features: { category: "unknown", constraints: [], sensitivity: "medium", time_constraint: "unspecified" },
            raw_payload_ref: null
          };
          const r1 = await fetch(API_BASE + '/v1/intent', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(capsule)});
          const j1 = await r1.json();
          if(!r1.ok){ out.textContent = JSON.stringify(j1, null, 2); return; }
          const r2 = await fetch(API_BASE + '/v1/fit/' + j1.intent_id, {method:'POST'});
          const j2 = await r2.json();
          out.textContent = JSON.stringify(j2, null, 2);
        });
      })();
    </script>
  </div>
  <?php return ob_get_clean();
}
add_shortcode('aimas_search', 'aimas_search_shortcode');

function aimas_settings_menu() { add_options_page('AIMAS Search', 'AIMAS Search', 'manage_options', 'aimas-search', 'aimas_settings_page'); }
add_action('admin_menu', 'aimas_settings_menu');

function aimas_settings_page() {
  if (isset($_POST['aimas_api_base'])) { update_option('aimas_api_base', sanitize_text_field($_POST['aimas_api_base'])); echo '<div class="updated"><p>Saved.</p></div>'; }
  $api_base = get_option('aimas_api_base', '');
  ?>
  <div class="wrap">
    <h1>AIMAS Search Settings</h1>
    <form method="post">
      <label>API Base URL (Cloud Run)</label><br/>
      <input type="text" name="aimas_api_base" value="<?php echo esc_attr($api_base); ?>" style="width:520px;">
      <p><button class="button button-primary" type="submit">Save</button></p>
    </form>
  </div>
  <?php
}
