import { useI18n } from "../../i18n/I18nContext";
import type { AnomalyEvent } from "../../data/demoData";
import { EventCard } from "./EventCard";

export function EventStream({
  events,
  selectedId,
  onSelect,
}: {
  events: AnomalyEvent[];
  selectedId: string | null;
  onSelect: (e: AnomalyEvent) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="s11-event-stream">
      <div className="s11-section-head">
        <span className="s11-eyebrow">EVENT FEED</span>
        <h3>{t("event.stream.title")}</h3>
        <span className="s11-section-badge">{t("event.stream.recent")}</span>
      </div>
      <div className="s11-event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={selectedId === event.id}
            onClick={() => onSelect(event)}
          />
        ))}
      </div>
    </div>
  );
}
