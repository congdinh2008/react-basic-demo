import { RoomStatus } from "../../enums/room-status.enum";
import { RoomType } from "../../enums/room-type.enum";
import { MasterBaseViewModel } from "../master-base.view-model";

export class RoomViewModel extends MasterBaseViewModel {
    public number!: string;
    public type!: RoomType;
    public pricePerNight!: number;
    public status!: RoomStatus;
    public capacity!: number;
}