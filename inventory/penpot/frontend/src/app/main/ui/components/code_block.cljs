;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC

(ns app.main.ui.components.code-block
  (:require-macros [app.main.style :as stl])
  (:require
   [app.common.data.macros :as dm]
   [cuerdas.core :as str]
   [promesa.core :as p]
   [rumext.v2 :as mf]
   [shadow.lazy :as lazy]))

(def highlight-fn
  (lazy/loadable app.util.code-highlight/highlight!))

(mf/defc code-block
  {::mf/wrap-props false}
  [{:keys [code type]}]
  (let [block-ref (mf/use-ref)
        code (str/trim code)]

    (mf/with-effect [code type]
      (when-let [node (mf/ref-val block-ref)]
        (p/let [highlight-fn (lazy/load highlight-fn)]
          (highlight-fn node))))

    [:pre {:class (dm/str type " " (stl/css :code-display)) :ref block-ref} code]))

