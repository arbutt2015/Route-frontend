import newIcon from "../../../assets/icons/project-new.svg";
import openIcon from "../../../assets/icons/project-open.svg";
import detailsIcon from "../../../assets/icons/project-details.svg";
import lockIcon from "../../../assets/icons/project-lock.svg";
import codeIcon from "../../../assets/icons/project-route-code.svg";
import collectedIcon from "../../../assets/icons/project-show-collected.svg";
import editIcon from "../../../assets/icons/route-edit.svg";
import saveIcon from "../../../assets/icons/route-save.svg";
import drawIcon from "../../../assets/icons/route-draw.svg";
import removeIcon from "../../../assets/icons/route-remove.svg";
import undoIcon from "../../../assets/icons/route-undo.svg";
import redoIcon from "../../../assets/icons/route-redo.svg";
import { HeaderIconButton } from "./HeaderIconButton";
import {
  ActionGroup,
  ActionNavigation,
  ActionRow,
  GroupCaption,
} from "./AuthenticatedLayout.style";

const groups = [
  {
    label: "Project",
    actions: [
      { id: "new", label: "New", icon: newIcon, disabled: false },
      { id: "open", label: "Open", icon: openIcon, disabled: false },
      { id: "details", label: "Details", icon: detailsIcon, disabled: true },
      { id: "lock", label: "Lock", icon: lockIcon, disabled: true },
      { id: "routeCode", label: "Route Code", icon: codeIcon, disabled: true },
      {
        id: "showCollected",
        label: "Show Collected",
        icon: collectedIcon,
        disabled: true,
      },
    ],
  },
  {
    label: "Route",
    actions: [
      { id: "edit", label: "Edit", icon: editIcon, disabled: true },
      { id: "save", label: "Save", icon: saveIcon, disabled: true },
      { id: "draw", label: "Draw", icon: drawIcon, disabled: true },
      { id: "remove", label: "Remove", icon: removeIcon, disabled: true },
      { id: "undo", label: "Undo", icon: undoIcon, disabled: true },
      { id: "redo", label: "Redo", icon: redoIcon, disabled: true },
    ],
  },
] as const;

export type HeaderActionId = (typeof groups)[number]["actions"][number]["id"];
export type HeaderActionHandlers = Partial<Record<HeaderActionId, () => void>>;

export const HeaderActions = ({
  actions = {},
}: {
  actions?: HeaderActionHandlers;
}) => (
  <ActionNavigation aria-label="Project and route actions">
    {groups.map((group) => (
      <ActionGroup key={group.label} role="group" aria-label={group.label}>
        <ActionRow>
          {group.actions.map((action) => (
            <HeaderIconButton
              key={action.id}
              icon={<img src={action.icon} alt="" aria-hidden="true" />}
              label={action.label}
              disabled={action.disabled}
              onClick={actions[action.id]}
            />
          ))}
        </ActionRow>
        <GroupCaption>{group.label}</GroupCaption>
      </ActionGroup>
    ))}
  </ActionNavigation>
);
