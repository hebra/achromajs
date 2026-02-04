declare namespace chrome {
    namespace tabs {
        interface Tab {
            id?: number;
            url?: string;
            active: boolean;
        }
        interface ActiveInfo {
            tabId: number;
            windowId: number;
        }
        interface TabChangeInfo {
            status?: string;
            url?: string;
            pinned?: boolean;
            audible?: boolean;
            discarded?: boolean;
            autoDiscardable?: boolean;
            mutedInfo?: any;
            favIconUrl?: string;
            title?: string;
            groupId?: number;
        }
        interface TabActivatedEvent {
            addListener(callback: (activeInfo: ActiveInfo) => void): void;
        }
        interface TabUpdatedEvent {
            addListener(callback: (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void): void;
        }
        const onActivated: TabActivatedEvent;
        const onUpdated: TabUpdatedEvent;
        function get(tabId: number): Promise<Tab>;
        function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
    }
    namespace scripting {
        interface ScriptInjection {
            func: (...args: any[]) => void;
            args?: any[];
            target: {
                tabId: number;
                allFrames?: boolean;
                frameIds?: number[];
            };
        }
        function executeScript(injection: ScriptInjection): Promise<any>;
    }
    namespace storage {
        interface StorageArea {
            get(keys?: string | string[] | Object | null): Promise<{ [key: string]: any }>;
            set(items: { [key: string]: any }): Promise<void>;
        }
        const local: StorageArea;
    }
    namespace permissions {
        function request(permissions: { permissions?: string[]; origins?: string[] }): Promise<boolean>;
    }
}
