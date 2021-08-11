type LogType = "INFO" | "WARN" | "ERROR" | "DEBUG";

function getTimeStamp(): string {
    return new Date().toISOString();
}

export default function log(type: LogType, namespace: string, message: string, object?: any) {
    console.log(`[${getTimeStamp()}] [${type}] [${namespace}] ${message}`, object || "");
}
