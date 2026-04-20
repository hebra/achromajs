/**
 * Copyright 2024 Hendrik Brandt
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * See file LICENSE for the full license.
 */

(function () {
  const svgId = "achromajs-svg-filters";
  if (document.getElementById(svgId)) {
    return;
  }

  const svgContent = `PLACEHOLDER_SVG_FILTERS`;
  if (!svgContent || !svgContent.includes("<svg")) {
    return;
  }

  const inject = () => {
    if (document.getElementById(svgId)) return;
    const container = document.body || document.documentElement;
    if (container) {
      console.log("AchromaJS: Inserting SVG filters...");
      container.insertAdjacentHTML("afterbegin", svgContent);
      console.log("AchromaJS: SVG filters inserted.");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
