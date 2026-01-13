// import { motion } from "framer-motion";

// export default function PerformanceBars({
//   accuracy,
//   recall,
//   precision,
//   f1
// }) {
//   const CHART_HEIGHT = 200;

//   const metrics = [
//     { label: "Accuracy", value: accuracy },
//     { label: "Recall", value: recall },
//     { label: "Precision", value: precision },
//     { label: "F1 Score", value: f1 }
//   ];

//   return (
//     <section className="bg-card border border-borderSubtle rounded-2xl p-10 shadow-sm">
//       <h2 className="text-xl font-semibold text-textPrimary mb-8">
//         Classification Performance Metrics
//       </h2>

//       {/* Chart */}
//       <div
//         className="relative grid grid-cols-4 gap-12 items-end"
//         style={{ height: CHART_HEIGHT }}
//       >
//         {/* Background scale */}
//         {[25, 50, 75, 100].map(v => (
//           <div
//             key={v}
//             className="absolute left-0 right-0 border-t border-borderSubtle text-[10px] text-muted"
//             style={{ bottom: `${(v / 100) * CHART_HEIGHT}px` }}
//           >
//             <span className="absolute -top-2 -left-8">{v}%</span>
//           </div>
//         ))}

//         {/* Bars */}
//         {metrics.map((m, i) => {
//           const barHeight = Math.round(m.value * CHART_HEIGHT);

//           return (
//             <div
//               key={m.label}
//               className="flex flex-col items-center justify-end h-full group"
//             >
//               <motion.div
//                 initial={{ height: 0 }}
//                 animate={{ height: barHeight }}
//                 transition={{
//                   duration: 0.9,
//                   delay: i * 0.15,
//                   ease: "easeOut"
//                 }}
//                 className="
//                   w-10
//                   rounded-t-xl
//                   bg-gradient-to-t
//                   from-primary
//                   to-primaryLight
//                   shadow-md
//                   group-hover:opacity-90
//                 "
//               />

//               {/* Label */}
//               <p className="mt-4 text-sm text-textSecondary">
//                 {m.label}
//               </p>

//               {/* Value */}
//               <p className="text-sm font-semibold text-textPrimary">
//                 {(m.value * 100).toFixed(1)}%
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";

export default function PerformanceBars({ accuracy, recall, precision, f1 }) {
  const data = [
    { label: "Accuracy", value: accuracy * 100 },
    { label: "Recall", value: recall * 100 },
    { label: "Precision", value: precision * 100 },
    { label: "F1 Score", value: f1 * 100 },
  ];

  return (
    <div className="bg-card border border-borderSubtle rounded-2xl p-8 shadow-sm h-full flex flex-col">
      {/* Title */}
      <h2 className="text-xl font-semibold text-textPrimary mb-6">
        Classification Performance Metrics
      </h2>

      {/* Chart Area */}
      <div className="flex-1 flex items-end justify-between gap-10 px-6 h-64">
        {data.map((m, i) => (
          <div
            key={m.label}
            className="flex flex-col items-center justify-end h-full"
          >
            {/* Bar Container (fixed height reference) */}
            <div className="relative w-14 h-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${m.value}%` }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="absolute bottom-0 w-full rounded-t-xl bg-gradient-to-t from-primary to-primary/30 shadow-md"
              />
            </div>

            {/* Labels */}
            <p className="mt-4 text-sm text-textSecondary">
              {m.label}
            </p>
            <p className="text-sm font-semibold text-textPrimary">
              {m.value.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
