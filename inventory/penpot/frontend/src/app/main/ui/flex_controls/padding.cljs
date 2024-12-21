;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC

(ns app.main.ui.flex-controls.padding
  (:require
   [app.common.geom.point :as gpt]
   [app.common.types.modifiers :as ctm]
   [app.main.data.workspace.modifiers :as dwm]
   [app.main.refs :as refs]
   [app.main.store :as st]
   [app.main.ui.css-cursors :as cur]
   [app.main.ui.flex-controls.common :as fcc]
   [app.main.ui.workspace.viewport.viewport-ref :refer [point->viewport]]
   [app.util.dom :as dom]
   [rumext.v2 :as mf]))

(mf/defc padding-display
  [{:keys [frame-id zoom hover-all? hover-v? hover-h? padding-num padding on-pointer-enter on-pointer-leave
           rect-data hover? selected? mouse-pos hover-value on-move-selected on-context-menu]}]
  (let [resizing?            (mf/use-var false)
        start                (mf/use-var nil)
        original-value       (mf/use-var 0)
        negate?              (true? (:resize-negate? rect-data))
        axis                 (:resize-axis rect-data)

        on-pointer-down
        (mf/use-fn
         (mf/deps frame-id rect-data padding-num)
         (fn [event]
           (dom/capture-pointer event)
           (reset! resizing? true)
           (reset! start (dom/get-client-position event))
           (reset! original-value (:initial-value rect-data))))

        on-lost-pointer-capture
        (mf/use-fn
         (mf/deps frame-id padding-num padding)
         (fn [event]
           (dom/release-pointer event)
           (reset! resizing? false)
           (reset! start nil)
           (reset! original-value 0)
           (st/emit! (dwm/apply-modifiers))))

        on-pointer-move
        (mf/use-fn
         (mf/deps frame-id padding-num padding hover-all? hover-v? hover-h?)
         (fn [event]
           (let [pos (dom/get-client-position event)]
             (reset! mouse-pos (point->viewport pos))
             (when @resizing?
               (let [delta               (-> (gpt/to-vec @start pos)
                                             (cond-> negate? gpt/negate)
                                             (get axis))
                     val                 (int (max (+ @original-value (/ delta zoom)) 0))
                     layout-padding      (cond
                                           hover-all? (assoc padding :p1 val :p2 val :p3 val :p4 val)
                                           hover-v?   (assoc padding :p1 val :p3 val)
                                           hover-h?   (assoc padding :p2 val :p4 val)
                                           :else      (assoc padding padding-num val))


                     layout-padding-type (if (= (:p1 padding) (:p2 padding) (:p3 padding) (:p4 padding)) :simple :multiple)
                     modifiers           (dwm/create-modif-tree [frame-id]
                                                                (-> (ctm/empty)
                                                                    (ctm/change-property  :layout-padding layout-padding)
                                                                    (ctm/change-property  :layout-padding-type layout-padding-type)))]
                 (reset! hover-value val)
                 (st/emit! (dwm/set-modifiers modifiers)))))))]

    [:g.padding-rect
     [:rect.info-area
      {:x (:x rect-data)
       :y (:y rect-data)
       :width (max 0 (:width rect-data))
       :height (max 0 (:height rect-data))
       :on-pointer-enter on-pointer-enter
       :on-pointer-leave on-pointer-leave
       :on-pointer-move on-pointer-move
       :on-pointer-down on-move-selected
       :on-context-menu on-context-menu
       :style {:fill (if (or hover? selected?) fcc/distance-color "none")
               :opacity (if selected? 0.5 0.25)}}]

     (let [handle-width
           (if (= axis :x)
             (/ 2 zoom)
             (min (* (:width rect-data) 0.5) (/ 20 zoom)))

           handle-height
           (if (= axis :y)
             (/ 2 zoom)
             (min (* (:height rect-data) 0.5) (/ 30 zoom)))]
       [:rect.handle
        {:x (+ (:x rect-data) (/ (- (:width rect-data) handle-width) 2))
         :y (+ (:y rect-data) (/ (- (:height rect-data) handle-height) 2))
         :width handle-width
         :height handle-height
         :on-pointer-enter on-pointer-enter
         :on-pointer-leave on-pointer-leave
         :on-pointer-down on-pointer-down
         :on-lost-pointer-capture on-lost-pointer-capture
         :on-pointer-move on-pointer-move
         :on-context-menu on-context-menu
         :class (when (or hover? selected?)
                  (if (= (:resize-axis rect-data) :x) (cur/get-dynamic "resize-ew" 0) (cur/get-dynamic "resize-ew" 90)))
         :style {:fill (if (or hover? selected?) fcc/distance-color "none")
                 :opacity (if selected? 0 1)}}])]))

(mf/defc padding-rects
  [{:keys [frame zoom alt? shift? on-move-selected on-context-menu]}]
  (let [frame-id                           (:id frame)
        paddings-selected                  (mf/deref refs/workspace-paddings-selected)
        hover-value                        (mf/use-state 0)
        mouse-pos                          (mf/use-state nil)
        hover                              (mf/use-state nil)
        hover-all?                         (and (not (nil? @hover)) alt?)
        hover-v?                           (and (or (= @hover :p1) (= @hover :p3)) shift?)
        hover-h?                           (and (or (= @hover :p2) (= @hover :p4)) shift?)
        padding                            (:layout-padding frame)
        {:keys [width height x1 x2 y1 y2]} (:selrect frame)
        on-pointer-enter                   (fn [hover-type val]
                                             (reset! hover hover-type)
                                             (reset! hover-value val))
        on-pointer-leave                   #(reset! hover nil)
        pill-width                         (/ fcc/flex-display-pill-width zoom)
        pill-height                        (/ fcc/flex-display-pill-height zoom)
        hover?                             #(or hover-all?
                                                (and (or (= % :p1) (= % :p3)) hover-v?)
                                                (and (or (= % :p2) (= % :p4)) hover-h?)
                                                (= @hover %))
        negate                             {:p1 (if (:flip-y frame) true false)
                                            :p2 (if (:flip-x frame) true false)
                                            :p3 (if (:flip-y frame) true false)
                                            :p4 (if (:flip-x frame) true false)}
        negate                             (cond-> negate
                                             (not= :auto (:layout-item-h-sizing frame)) (assoc :p2 (not (:p2 negate)))
                                             (not= :auto (:layout-item-v-sizing frame)) (assoc :p3 (not (:p3 negate))))

        padding-rect-data                  {:p1 {:key (str frame-id "-p1")
                                                 :x x1
                                                 :y (if (:flip-y frame) (- y2 (:p1 padding)) y1)
                                                 :width width
                                                 :height (:p1 padding)
                                                 :initial-value (:p1 padding)
                                                 :resize-type (if (:flip-y frame) :bottom :top)
                                                 :resize-axis :y
                                                 :resize-negate? (:p1 negate)}
                                            :p2 {:key (str frame-id "-p2")
                                                 :x (if (:flip-x frame) x1 (- x2 (:p2 padding)))
                                                 :y y1
                                                 :width (:p2 padding)
                                                 :height height
                                                 :initial-value (:p2 padding)
                                                 :resize-type :left
                                                 :resize-axis :x
                                                 :resize-negate? (:p2 negate)}
                                            :p3 {:key (str frame-id "-p3")
                                                 :x x1
                                                 :y (if (:flip-y frame) y1 (- y2 (:p3 padding)))
                                                 :width width
                                                 :height (:p3 padding)
                                                 :initial-value (:p3 padding)
                                                 :resize-type :bottom
                                                 :resize-axis :y
                                                 :resize-negate? (:p3 negate)}
                                            :p4 {:key (str frame-id "-p4")
                                                 :x (if (:flip-x frame) (- x2 (:p4 padding)) x1)
                                                 :y y1
                                                 :width (:p4 padding)
                                                 :height height
                                                 :initial-value (:p4 padding)
                                                 :resize-type (if (:flip-x frame) :right :left)
                                                 :resize-axis :x
                                                 :resize-negate? (:p4 negate)}}]

    [:g.paddings {:pointer-events "visible"}
     (for [[padding-num rect-data] padding-rect-data]
       [:& padding-display
        {:key (:key rect-data)
         :frame-id frame-id
         :zoom zoom
         :hover-all? hover-all?
         :hover-v? hover-v?
         :hover-h? hover-h?
         :padding padding
         :mouse-pos mouse-pos
         :hover-value hover-value
         :padding-num padding-num
         :on-pointer-enter (partial on-pointer-enter padding-num (get padding padding-num))
         :on-pointer-leave on-pointer-leave
         :on-move-selected on-move-selected
         :on-context-menu on-context-menu
         :hover?  (hover? padding-num)
         :selected? (get paddings-selected padding-num)
         :rect-data rect-data}])
     (when @hover
       [:& fcc/flex-display-pill
        {:height pill-height
         :width pill-width
         :font-size (/ fcc/font-size zoom)
         :border-radius (/ fcc/flex-display-pill-border-radius zoom)
         :color fcc/distance-color
         :x (:x @mouse-pos)
         :y (- (:y @mouse-pos) pill-width)
         :value @hover-value}])]))

(mf/defc padding-control
  [{:keys [frame zoom alt? shift? on-move-selected on-context-menu]}]
  (when frame
    [:g.measurement-gaps {:pointer-events "none"}
     [:g.hover-shapes
      [:& padding-rects
       {:frame frame
        :zoom zoom
        :alt? alt?
        :shift? shift?
        :on-move-selected on-move-selected
        :on-context-menu on-context-menu}]]]))
